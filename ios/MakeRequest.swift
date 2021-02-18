//
//  MakeRequest.swift
//  ALTEKDrivers
//
//  Created by Shumihin Oleksandr on 9/2/21.
//

import Foundation


class RequestService {
  func post(link:String, token:String, lat:Double, long:Double ) {
    guard  let url = URL(string: link) else {return}
    
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    
    let userData = ["location":"\(lat),\(long)"]
    guard let httpBody = try? JSONSerialization.data(withJSONObject: userData, options:[]) else {return}
    
    request.httpBody = httpBody
    request.addValue("application/json", forHTTPHeaderField:"Content-Type")
    request.addValue("JWT \(token)", forHTTPHeaderField:"Authorization")
    
    let session = URLSession.shared
    
    session.dataTask(with: request) { (data, res, error) in
      guard let data = data else {return}
     
      do {
        let json = try JSONSerialization.jsonObject(with: data, options: [])
        print(json)
      }
      catch {
        print(error)
      }
    }.resume()
  }
}

