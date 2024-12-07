package com.anu03.jdbcTest.service;

import com.anu03.jdbcTest.model.Photo;
import com.anu03.jdbcTest.repository.PhotosRepository;
import org.springframework.stereotype.Service;

//@Component
@Service
public class PhotosService {

    private final PhotosRepository photosRepository;

    public PhotosService(PhotosRepository photosRepository) {
        this.photosRepository = photosRepository;
    }

    public Iterable<Photo> get() {
        return photosRepository.findAll();
    }

    public Photo get(Integer id) {
        return photosRepository.findById(id).orElse(null);
    }

    public void remove(Integer id) {
        photosRepository.deleteById(id);
    }

    public Photo save(String filename, String contentType, byte[] data) {
        Photo photo = new Photo();
        photo.setContentType(contentType);
        photo.setFileName(filename);
        photo.setData(data);
        photosRepository.save(photo);
        return photo;
    }
}
