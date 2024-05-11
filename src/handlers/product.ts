import prisma from "../db";

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });

    res.json({ data: user.products });
  } catch (error) {
    next(error);
  }
};

// Get one product
export const getOneProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
