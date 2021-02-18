package au.com.altekdrivers.backgroundLocationService;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.widget.TabHost;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;

import org.jetbrains.annotations.NotNull;

import au.com.altekdrivers.R;


public class BackgroundLocationService extends ReactContextBaseJavaModule  {
    public static final String CHANNEL_ID = "ExampleService_Channel";
    LocationRequest locationRequest;
    FusedLocationProviderClient fusedLocationProviderClient;
    private Context context;

    static private int distanceFilter;
    static private int interval;
    static public String token;
    static public String link;

    //constructor
    public BackgroundLocationService(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "testName", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = reactContext.getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }



    @ReactMethod
    public void startBackgroundService(String token, String url, int interval, int distance) {
        BackgroundLocationService.token = token;
        BackgroundLocationService.link = url;
        BackgroundLocationService.distanceFilter = distance;
        BackgroundLocationService.interval = interval;
        updateLocation();
        NotificationService.sendNotification(getReactApplicationContext(),CHANNEL_ID,"Location service is running in the background");
        Toast.makeText(context,"Start Service",Toast.LENGTH_SHORT).show();

//        PendingIntent sender = PendingIntent.getBroadcast(this.context, 2, intent, PendingIntent.FLAG_UPDATE_CURRENT);
//        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
//        if (am != null) {
//            am.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), interval, sender);
//        }
    }

    @ReactMethod
    public void stopBackgroundService() {
        fusedLocationProviderClient.removeLocationUpdates(getPendingIntent());
        Toast.makeText(context,"Stop Service",Toast.LENGTH_SHORT).show();

    }

    @NotNull
    @Override
    public String getName() {
        return "BackgroundLocationService";
    }

    static void sendNotification(Context context) {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context);

        builder.setSmallIcon(R.mipmap.ic_launcher)
                .setLargeIcon(BitmapFactory.decodeResource(context.getResources(),
                        R.mipmap.ic_launcher))
                .setColor(Color.RED)
                .setContentTitle("Location Service")
                .setContentText("Location service is running in the background")
                .setAutoCancel(true);

        NotificationManager mNotificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = context.getString(R.string.app_name);
            NotificationChannel mChannel =
                    new NotificationChannel(CHANNEL_ID, name, NotificationManager.IMPORTANCE_DEFAULT);

            mNotificationManager.createNotificationChannel(mChannel);
            builder.setChannelId(CHANNEL_ID);
        }
        mNotificationManager.notify(0, builder.build());
    }


    private void updateLocation() {
        buildLocationRequest();
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(getReactApplicationContext());
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        fusedLocationProviderClient.requestLocationUpdates(locationRequest, getPendingIntent());
    }

    private PendingIntent getPendingIntent() {
        Intent intent = new Intent(getReactApplicationContext(), BackgroundService.class);
        intent.setAction("BGSendGeolocation");
        return PendingIntent.getBroadcast(getReactApplicationContext(), 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
    }


    private void buildLocationRequest() {
        locationRequest = new LocationRequest();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setInterval(10000 * 60);
        locationRequest.setFastestInterval(1000 * 30);
//        locationRequest.setSmallestDisplacement(10f);
    }

    //
//    //Custom function that we are going to export to JS
//    @ReactMethod
//    public void getDeviceName(Callback cb) {
//        try {
//            cb.invoke(null, android.os.Build.MODEL);
//        } catch (Exception e) {
//            cb.invoke(e.toString(), null);
//        }
//    }


//    @ReactMethod
//    public void getLocation(Integer minTime, Integer minDistance, Promise promise) {
//        Log.d("Props", " "+minTime + "  "+ minDistance);
//        WritableMap res = Arguments.createMap();
//        try {
//            LocationManager locationManager = null;
//
//            locationManager = (LocationManager) this.getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
//            int permissionCheck = ContextCompat.checkSelfPermission(this.getReactApplicationContext(),
//                    android.Manifest.permission.ACCESS_FINE_LOCATION);
//            if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
//                Criteria criteria = new Criteria();
//                String bestProvider = locationManager.getBestProvider(criteria, false);
//                Location location = locationManager.getLastKnownLocation(bestProvider);
//                if (location != null) {
//                    Log.d("START","START" + location.getLatitude());
//
//                    res.putDouble("latitude", location.getLatitude());
//                    res.putDouble("longitude", location.getLongitude());
//                    promise.resolve(res);
//                }
//                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
//                        minTime,
//                        minDistance,
//                        locationListener);
//
//            }
//        } catch (Exception e) {
//            promise.reject(e);
//            return;
//        }
//    }

    //    @ReactMethod
//    public void startService(String token, String user_id, String id, String url_string, Promise promise) {
//        WritableMap result = Arguments.createMap();
//        result.putString("ststus", "success");
//        try {
//            Intent serviceIntent = new Intent(getReactApplicationContext(),BackgroundService.class);
//            serviceIntent.putExtra("token", token);
//            serviceIntent.putExtra("user_id", user_id);
//            serviceIntent.putExtra("id", id);
//            serviceIntent.putExtra("url_string", url_string);
//            getReactApplicationContext().startService(serviceIntent);
//            promise.resolve(result);
//        } catch (Exception e) {
//            e.printStackTrace();
//            promise.reject("rrrrr",e);
//            return;
//        }
//
//    }


}