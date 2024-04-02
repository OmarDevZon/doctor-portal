export const filter = (param: any, pagination: any) => {
  const { search, ...filterData } = param;
  const { page, limit } = pagination;

  console.log(page, limit, "file name : filter line number : +-5");
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);

  const addConditions = [];

  if (param.search) {
    addConditions.push({
      OR: ["name", "email"].map((field) => ({
        [field]: {
          contains: param.search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addConditions.push({
      AND: Object.keys(filterData).map((keys) => ({
        [keys]: {
          equals: filterData[keys],
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition = { AND: addConditions };

  const filter = {
    where: whereCondition,
    skip: (pageInt - 1) * limitInt,
    take: limitInt,
  };

  return filter;
};
