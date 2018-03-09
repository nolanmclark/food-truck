use foodtruck;
create table messages (
    mid int not null auto_increment,
    tid int not null,
    cntc_name varchar(60) not null,
    cntc_email varchar(320) not null,
    cntc_phone varchar(20) not null,
    msg varchar(256),
    subm_dt datetime,
    primary key(mid),
    foreign key(tid) references trucks(tid)
) engine=innodb;
