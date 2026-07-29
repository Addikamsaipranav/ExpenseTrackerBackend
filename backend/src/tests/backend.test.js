const axios = require("axios");

const BASE_URL = "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let token = "";

let festivalId = "";
let memberId = "";
let collectionId = "";
let expenseId = "";

let passed = 0;
let failed = 0;

const startTime = Date.now();

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function title(text) {
  console.log("\n");
  console.log(colors.cyan + "========================================");
  console.log(text);
  console.log("========================================" + colors.reset);
}

function pass(message) {
  passed++;
  console.log(`${colors.green}✔ ${message}${colors.reset}`);
}

function fail(message, error = "") {
  failed++;
  console.log(`${colors.red}✖ ${message}${colors.reset}`);

  if (error) {
    if (error.response?.data) {
      console.log(error.response.data);
    } else {
      console.log(error.message || error);
    }
  }
}

async function runTest(name, callback) {
  try {
    await callback();
    pass(name);
  } catch (err) {
    fail(name, err);
  }
}
async function authenticationTests() {

  title("AUTHENTICATION TESTS");

  await runTest("Login Success", async () => {

    const response = await api.post("/auth/login", {
      email: "admin@example.com",
      password: "admin123"
    });

    token = response.data.data.token;

    api.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;

  });

  await runTest("Wrong Password", async () => {

    try {

      await api.post("/auth/login", {
        email: "admin@example.com",
        password: "wrongpassword"
      });

      throw new Error("Should fail");

    } catch (err) {

      if (err.response.status !== 401)
        throw err;

    }

  });

  await runTest("Wrong Email", async () => {

    try {

      await api.post("/auth/login", {
        email: "wrong@gmail.com",
        password: "admin123"
      });

      throw new Error("Should fail");

    } catch (err) {

      if (err.response.status !== 401)
        throw err;

    }

  });

}
async function main() {

  console.clear();

  console.log("GANESH MANDAL BACKEND TEST SUITE");

  console.log("--------------------------------");

  await authenticationTests();

  console.log("\n");

  console.log("--------------------------------");

  console.log(`Passed : ${passed}`);

  console.log(`Failed : ${failed}`);

  console.log(
    `Execution Time : ${
      ((Date.now() - startTime) / 1000).toFixed(2)
    } sec`
  );

}

main();