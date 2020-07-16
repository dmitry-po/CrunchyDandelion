USE CrunchyDandelionApp;

CREATE TABLE "Shifts" (
    "ShiftId" INT NOT NULL,
    "ChannelId" INT NOT NULL,
    "ShiftTime" VARCHAR(11),
	PRIMARY KEY ("Shiftid", "Channelid")
);

Insert into "Shifts" values(1, 1, '08:00-15:00');
Insert into "Shifts" values(2, 1, '15:00-20:00');
Insert into "Shifts" values(3, 1, '20:00-03:00');
Insert into "Shifts" values(1, 2, '23:00-03:00');
Insert into "Shifts" values(2, 2, '03:00-06:00');
Insert into "Shifts" values(3, 2, '06:00-10:00');
Insert into "Shifts" values(1, 3, '23:00-03:00');
Insert into "Shifts" values(2, 3, '03:00-06:00');
Insert into "Shifts" values(3, 3, '06:00-10:00');
Insert into "Shifts" values(1, 4, '08:00-15:00');
Insert into "Shifts" values(2, 4, '15:00-20:00');
Insert into "Shifts" values(3, 4, '20:00-03:00');
Insert into "Shifts" values(1, 5, '23:00-03:00');
Insert into "Shifts" values(2, 5, '03:00-06:00');
Insert into "Shifts" values(3, 5, '06:00-10:00');
Insert into "Shifts" values(1, 6, '23:00-03:00');
Insert into "Shifts" values(2, 6, '03:00-06:00');
Insert into "Shifts" values(3, 6, '06:00-10:00');

select * from "Shifts"