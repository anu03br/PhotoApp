package com.anu03.jdbcTest.web;

import com.anu03.jdbcTest.model.Photo;
import com.anu03.jdbcTest.service.PhotosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//this annotation allows calls from another origin (port 3000) to be processed
@CrossOrigin
//this annotation will tell spring to automatically create a new instance when running main
@RestController
public class PhotosController {

    private final PhotosService photosService;

    public PhotosController(PhotosService photosService) {
        this.photosService = photosService;
    }


    @PostMapping("/photos")
    public Photo create(@RequestPart("data") MultipartFile file) throws IOException {
        return photosService.create(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }

    // this is the "select * from" method
    @GetMapping("/photos")
    public Iterable<Photo> get() {
        return photosService.get();
    }

//    // this is the "select 1 from" method
    @GetMapping("/photos/{id}")
    public Photo get(@PathVariable Integer id) {
        Photo photo = photosService.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }


    // this is the "delete from " method
@DeleteMapping("/photos/{id}")
public ResponseEntity<?> delete(@PathVariable Integer id) {
    // Check if the photo exists
    Photo photo = photosService.get(id); // Ensure this method retrieves the photo
    if (photo == null) {
        // Return a clear error response with 404 status
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", "Photo not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    Map<String, String> responseBody = new HashMap<>();
    responseBody.put("fileName", photo.getFileName());
    // Delete the photo
    photosService.delete(id);

    // Return the deleted photo with 200 OK status
    return ResponseEntity.ok( responseBody);
}

    //    if we goto 'http://localhost:8080/' this should be run
    // this method is obsolete since we have a proper frontend now
    @GetMapping("/")
    public String hello() {
//        here we can return HTML elements as a String
        return "<h1>Welcome to the project</h1><p>This is a Spring Boot app!</p>";
    }

}