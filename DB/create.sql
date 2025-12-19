-- DB/create.sql
-- Script de creación de base de datos y tablas
-- Proyecto: FunOnTrip / PixelNomads

DROP DATABASE IF EXISTS funontrip_db;
CREATE DATABASE funontrip_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE funontrip_db;

-- TODO:
-- Aquí van los CREATE TABLE según el diagrama ER (.mwb)
-- Buenas prácticas:
-- 1) Tablas padre primero
-- 2) Luego tablas con FK
-- 3) ENGINE=InnoDB
