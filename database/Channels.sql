USE CrunchyDandelionApp;

CREATE TABLE "Channels" (
    "ChannelId" INT NOT NULL PRIMARY KEY,
    "ChannelName" VARCHAR(20) NOT NULL,
    "ChannelAddress" VARCHAR(100),
);

Insert into "Channels" values(1, '���0001', '������������� �����, 1');
Insert into "Channels" values(2, '���0002', '������������� 1-�, 21 ��2');
Insert into "Channels" values(3, '���0003', '���������� 2-� ������, 22');
Insert into "Channels" values(4, '���0004', '������� ������ ��������, 12 �4');
Insert into "Channels" values(5, '���0005', '�����, 9 �2 ���');
Insert into "Channels" values(6, '���0006', '������� ��������, 10 �1');

select * from "Channels"