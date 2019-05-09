const functions = {
  add: (num1: number, num2: number) => num1 + num2,
  isNull: () => null,
  checkValue: (x: any) => x,
  createUser: () => {
    const user = { firstName: "Brad" };
    user["lastName"] = "Traversy";
    return user;
  }
};

export default functions;
