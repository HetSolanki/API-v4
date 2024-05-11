import { privateDecrypt } from "crypto";
import prisma from "../db";

export const getOneUpdate = async (req, res, next) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};
export const getUpdates = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);
    res.json({ data: updates });
  } catch (error) {
    next(error);
  }
};
export const createUpdate = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
      },
    });

    if (!product) {
      res.json({ message: "Not have such product" });
    }

    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: { connect: { id: product.id } },
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};
export const updateUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      res.json({ message: "Nope" });
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({ data: updatedUpdate });
  } catch (error) {
    next(error);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      res.json({ message: "Nope" });
    }

    const deleted = await prisma.update.delete({
      where: {
        id: match.id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
