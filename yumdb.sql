-- phpMyAdmin SQL Dump
-- version 4.1.8
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Nov 25, 2015 at 04:53 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `yumdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `friend_id`) VALUES
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(2, 1),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(3, 1),
(3, 2),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(4, 1),
(4, 2),
(4, 3),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `receiver_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `age`, `icon`, `phone_number`, `comment`, `table_id`) VALUES
(1, '大谷昇平', 21, './images/user/shohe.jpg', '0', 'IT学部の少年です', 0),
(2, '鶴保校長', 73, './images/user/tsuruho.jpg', '0', 'NTTで働いてました。', 0),
(3, '松島花', 32, './images/user/user_test.jpg', '0', 'ファッションモデルやってます！！', 0),
(4, '佐藤洋平', 32, './images/user/yohei.jpg', '0', 'ゲーム学科のイケメンです。', 1),
(5, '川西良', 35, './images/user/kawanishi.jpg', '0', 'IT学科でJava教えてます！', 2),
(6, '沼田やすひろ', 54, './images/user/numata.jpg', '0', 'シナリオ作るのが得意です^^', 3),
(7, '小泉昭彦', 45, './images/user/koizumi.jpg', '0', 'webの事はなんでも聞きなさい', 4),
(8, '高橋希', 24, './images/user/nozomi.jpg', '0', '絵描くのが大好きです☆', 0),
(9, '佐野真也', 23, './images/user/sano.jpg', '0', 'ゲーム作りは俺に任せろ！', 6),
(10, '浅野ちひろ', 22, './images/user/chihiro.jpg', '0', 'ゲーム大好き！', 7);
