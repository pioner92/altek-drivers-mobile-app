package au.com.altekdrivers.backgroundLocationService;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationResult;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;

public class BackgroundService extends BroadcastReceiver {

    public static final String CHANNEL_ID = "ExampleService_Channel";


    String token = null;
    String link;

    public BackgroundService(Context context, Intent intent) {
    }

    public BackgroundService() {
    }


    @Override
    public void onReceive(Context context, Intent intent) {
//        Bundle b = intent.getExtras();
        token = BackgroundLocationService.token;
        link = BackgroundLocationService.link;

        NotificationService.sendNotification(context,CHANNEL_ID,"Location Updated");

        LocationResult result = LocationResult.extractResult(intent);
        if (result != null) {
            Location location = result.getLastLocation();
            Toast.makeText(context,"Location Updated",Toast.LENGTH_SHORT).show();

            double latitude = location.getLatitude();
            double longitude = location.getLongitude();
            MakeRequest(token, latitude, longitude);
        }


//        LocationManager locationManager = (LocationManager) context.getSystemService(context.LOCATION_SERVICE);
//        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//            return;
//        }
//        Criteria criteria = new Criteria();
//        String bestProvider = locationManager.getBestProvider(criteria, false);
//        Location location = locationManager.getLastKnownLocation(bestProvider);

    }


    private String formattedVale(double value) {
        return new DecimalFormat("#0.000000").format(value);
    }

    private void MakeRequest(String token, double latitude, double longitude) {
        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    URL url = new URL(link);
                    HttpURLConnection con = (HttpURLConnection) url.openConnection();
                    con.setRequestMethod("POST");
                    con.setRequestProperty("Content-Type", "application/json; utf-8");
                    con.setRequestProperty("Accept", "application/json");
                    con.setRequestProperty("Authorization", "JWT " + token);
                    con.setDoOutput(true);

                    String postData = String.format("{\"location\":\"%s,%s\"}", formattedVale(latitude), formattedVale(longitude));

                    try (OutputStream os = con.getOutputStream()) {
                        byte[] input = postData.getBytes("utf-8");
                        os.write(input, 0, input.length);
                    }
                    try (BufferedReader br = new BufferedReader(
                            new InputStreamReader(con.getInputStream(), "utf-8"))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        System.out.println(response.toString());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    }
}



