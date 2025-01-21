const {
  AuthController,
} = require("../../app/http/controllers/auth_controller");
const bcrypt = require("bcrypt");
const UserModel = require("../../app/http/models/user_model");
jest.mock("../../app/utills/functions", () => ({
  generateUserToken: jest.fn(),
}));
const { generateUserToken } = require("../../app/utills/functions");

jest.mock("../../app/http/models/user_model");

// authentication test on register function
it("should return status code of 400 case of use existence", async () => {
  const request = {
    body: {
      email: "abolfazl@gmail.com",
      password: "12345678",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  UserModel.findOne.mockImplementationOnce(() => ({
    id: 1,
    email: "abolfazl@gmail.com",
    password: "12345678",
  }));
  await AuthController.signup(request, res, next);
  expect(next).toHaveBeenCalledWith({
    status: 400,
    message: "provided email has been already used,try other email or login",
  });
  //   jest.resortAllMocks();
});

it("should create jwt token with status 201", async () => {
  //Arrange
  const request = {
    body: {
      email: "abolfazl@gmail.com",
      password: "12345678",
    },
  };
  // response contains feilds of statusCode,message token
  const response = {
    statusCode: null,
    status: jest.fn().mockImplementationOnce((code) => {
      response.statusCode = code;
      return response;
    }),
    json: jest.fn(),
  };
  const next = jest.fn();
  // Act
  UserModel.findOne.mockImplementationOnce(() => null);

  // jest.spyOn(global,'generateUserToken').mockImplementationOnce(()=>"token")
  // hash radom password
  const hashed_password = await bcrypt.hash("12345678", 12);
  UserModel.create.mockImplementationOnce(() => ({
    email: "abolfazl@gmail.com",
    password: hashed_password,
  }));
  generateUserToken.mockReturnValueOnce("token");
  // Assert
  //expect to that the hash same with provided value
  await AuthController.signup(request, response, next);
  expect(response.status).toHaveBeenCalledWith(201);
  expect(response.json).toHaveBeenCalledWith({
    statusCode: 201,
    message: "successfully created user",
    token: "token",
  });
});

//login test
// test case : testing not exists email in login attempt
it("should return status code of 404, user not exists", async () => {
  const request = {
    body: {
      email: "abolfazl@gmail.com",
      password: "12345678",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  UserModel.findOne.mockImplementationOnce(() => null);
  // call function
  await AuthController.login(request, res, next);

  // assert next with 404 and message
  expect(next).toHaveBeenCalledWith({
      status:404,
      message:"User with provided email not found",
  })
});

