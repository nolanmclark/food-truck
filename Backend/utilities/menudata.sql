use foodtruck;
create table menus ( 
	mid int not null auto_increment,
	menu_img_url varchar(100),
	tid int not null,
	primary key(mid),
	foreign key(tid) references trucks(tid)
) engine = innodb;
create table menu_items(
	iid int not null auto_increment,
	mid int not null,
	category varchar(100),
	item varchar(100) not null,
	inv int,
	descr varchar(400) not null,
	price Decimal(13,2) not null,
	primary key(iid),
	foreign key(mid) references menus(mid)
) engine=innodb;
