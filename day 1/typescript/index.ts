/** @format */

console.log("hello");
type Tangka = number; //primitive

interface IUser {
  id: number;
  name: string;
}

interface IUser {
  alamat: string;
}
//id,name,alamat
interface IUser2 extends IUser {
  ukuran_sepatu: string;
}

interface IUser3 extends IUser2 {
  ukurang_baju: string;
}

type TUser = {
  id: number;
  name: string;
};

// type TUser = {

// }
type TUser3 = {
  id: number;
  name: string;
  alamat: string;
};

type TUser4 = {
  TTL: string;
};

type TUser2 = TUser & {
  alamat: string;
} & TUser4;

const penjumlahan = (a: Tangka, b: Tangka): Tangka => {
  return a + b;
};

const user: IUser = {
  id: 1,
  name: "test",
  alamat: "",
};

console.log(penjumlahan(2, 2));

console.log(user);

const showName = (user: IUser) => user.name;
console.log(showName(user));
