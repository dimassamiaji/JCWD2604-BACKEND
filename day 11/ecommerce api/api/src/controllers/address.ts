/** @format */
import { Response, NextFunction, Request } from "express";
import { ReqUser } from "../middlewares/auth-middleware";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
export const addressController = {
  async getProvince(req: Request, res: Response, next: NextFunction) {
    try {
      let check = await prisma.province.findMany({});
      let provinces;
      if (!check.length) {
        const res = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
        );

        provinces = (await res.json()) as [
          {
            id: number;
            name: string;
          }
        ];
        provinces = provinces.map(({ id, name }) => {
          return { id: Number(id), name };
        });
        await prisma.province.createMany({
          data: provinces,
        });
      }
      res.send({
        result: provinces || check,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { provinceId } = req.params;

      let check = await prisma.city.findMany({
        where: {
          ProvinceId: Number(provinceId),
        },
      });

      let cities;
      if (!check.length) {
        const res = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
        );

        cities = (await res.json()) as [
          {
            id: number;
            name: string;
            ProvinceId: number | undefined;
            province_id: number | undefined;
          }
        ];
        cities = cities.map(({ id, name, province_id }) => {
          return { id: Number(id), name, ProvinceId: Number(province_id) };
        });
        console.log(cities);

        await prisma.city.createMany({
          data: cities,
        });
      }
      res.send({
        result: cities || check,
      });
    } catch (error) {
      next(error);
    }
  },
};
