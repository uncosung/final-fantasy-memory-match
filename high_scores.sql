-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 10, 2020 at 07:23 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memory_match`
--

-- --------------------------------------------------------

--
-- Table structure for table `high_scores`
--

CREATE TABLE `high_scores` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `initials` varchar(3) NOT NULL,
  `guesses` mediumint(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `high_scores`
--

INSERT INTO `high_scores` (`id`, `initials`, `guesses`) VALUES
(1, 'NUM', 24),
(2, 'ABD', 25),
(3, 'TES', 26),
(4, 'JAM', 27),
(5, 'DAN', 28),
(6, 'TIM', 29),
(7, 'COD', 30),
(8, 'RON', 31),
(9, 'PAM', 32),
(10, 'JON', 33);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `high_scores`
--
ALTER TABLE `high_scores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `high_scores`
--
ALTER TABLE `high_scores`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
