package com.anu03.jdbcTest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DownloadController {

    //this part will lead to errors because it creates a circular dependency
    //the DownloadController is instancing itself, this is not allowed for a bean
//    private final DownloadController downloadController;
//
//    public DownloadController() {
//        this.downloadController = downloadController;
//    }
    public DownloadController() {

    }


    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> download(@PathVariable int id) {
        byte[] data = new byte[0];
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }
}
