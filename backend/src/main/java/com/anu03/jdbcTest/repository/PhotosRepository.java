package com.anu03.jdbcTest.repository;

import com.anu03.jdbcTest.model.Photo;
import org.springframework.data.repository.CrudRepository;

public interface PhotosRepository extends CrudRepository <Integer, Photo> {
}
