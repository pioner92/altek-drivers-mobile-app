////
////  sendingGeolocation.swift
////  ALTEKDrivers
////
////  Created by Shumihin Oleksandr on 9/2/21.
////
//
//import Foundation
//import UIKit
//import CoreLocation
//import BackgroundTasks
//
//
//
//
//@objc(SendGeolocationBG)
//class SendGeolocationBG: NSObject, CLLocationManagerDelegate {
//  
//  
//  
//  var locationManager = CLLocationManager()
//  var token:String?
//  var distance:Double?
//  var link:String?
//  
//  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//    
//    let coordinate = manager.location?.coordinate
//    guard let lat = coordinate?.latitude, let long = coordinate?.longitude else {return}
//    self.sendLocation(lat: lat, long: long)
//  }
//  
//  @objc
//  func doBackgroundTask(_ token : String, link:String, distance: Double) {
//    self.distance = distance
//    self.token = token
//    self.link = link
//    self.startUpdateLocation()
//  }
//  
//  func startUpdateLocation(){
//    locationManager.delegate = self
//    locationManager.desiredAccuracy = kCLLocationAccuracyBest
//    locationManager.distanceFilter = self.distance ?? kCLDistanceFilterNone
//    locationManager.requestAlwaysAuthorization()
//    locationManager.allowsBackgroundLocationUpdates = true
//    locationManager.pausesLocationUpdatesAutomatically = false
//    locationManager.startUpdatingLocation()
//  }
//  
//  
//  func sendLocation(lat:CLLocationDegrees, long: CLLocationDegrees) {
//    if let token = token , let link = self.link {
//      RequestService().post(link: link, token: token, lat: lat, long: long)
//    }
//  }
//}
