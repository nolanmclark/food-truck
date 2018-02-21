use foodtruck;
create table trucks (
	tid int not null auto_increment,
	name varchar(100) not null,
	email varchar(320) not null,
	private key (tid)
) engine = innodb;
create table users (
	uid int(4) not null auto_increment,
	fname varchar(30) not null,
	lname varchar(30) not null,
	email varchar(320) not null,
	tid int,
	foreign key (tid) references trucks(tid)
) engine = innodb;
create table truck_locs (
	open boolean not null,
	lat decimal(10,8) not null,
	lng decimal(11,8) not null,
	tid int not null,
	address varchar(140) not null,
	primary key (tid),
	foreign key (tid) references trucks(tid)
) engine=innodb;
create table menus (
	img_url varchar(100), 
	inventory int(3) not null,
	mid int not null,
	item varchar(100) not null,
	desc varchar(400) not null,
	price decimal(13,2) not null,
	cateogry varchar(100),
	tid int,
	primary key (mid),
	foreign key (tid) references trucks(tid)
) engine=innodb;
