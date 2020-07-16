USE CrunchyDandelionApp;

CREATE TABLE "Channels" (
    "ChannelId" INT NOT NULL PRIMARY KEY,
    "ChannelName" VARCHAR(20) NOT NULL,
    "ChannelAddress" VARCHAR(100),
);

Insert into "Channels" values(1, 'Маг0001', 'Шелепихинское шоссе, 1');
Insert into "Channels" values(2, 'Маг0002', 'Магистральная 1-я, 21 ст2');
Insert into "Channels" values(3, 'Маг0003', 'Силикатный 2-й проезд, 22');
Insert into "Channels" values(4, 'Маг0004', 'Маршала Жукова проспект, 12 к4');
Insert into "Channels" values(5, 'Маг0005', 'Зорге, 9 к2 стр');
Insert into "Channels" values(6, 'Маг0006', 'Маршала Бирюзова, 10 к1');

select * from "Channels"