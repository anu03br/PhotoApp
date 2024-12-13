package com.anu03.jdbcTest.service;

import com.anu03.jdbcTest.model.Photo;
import com.anu03.jdbcTest.repository.PhotosRepository;
import org.springframework.stereotype.Service;

@Service
public class PhotosService {

    public final PhotosRepository photosRepository;

    public PhotosService(PhotosRepository photosRepository) {
        this.photosRepository = photosRepository;
    }

    public Photo create(String fileName, String contentType, byte[] data) {
        Photo photo = new Photo();
        photo.setContentType(contentType);
        photo.setFileName(fileName);
        photo.setData(data);
        photosRepository.save(photo);
        return photo;
    }

    public Iterable<Photo> get() {

        return photosRepository.findAll();
    }

    public Photo get(Integer id) {

        return photosRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        photosRepository.deleteById(id);
    }

}
