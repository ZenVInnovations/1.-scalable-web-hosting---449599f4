import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  http.post(
    "http://localhost:7777/todos",
    JSON.stringify({ item: "Banana" })
  );
}