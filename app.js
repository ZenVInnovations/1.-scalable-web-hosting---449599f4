const portConfig = { port: 7777 };

const todos = [];

const handleGetRoot = async (request) => {
  return new Response("Hello world at root!");
};

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  return Response.json(todos[id]);
};

const handleGetTodos = async (request) => {
  return Response.json(todos);
};

const handlePostTodos = async (request) => {
  let todo
  try {
    todo = await request.json();
  } catch (error) {
    return new Response(error.message, {status: 400})
  }

  todos.push(todo);
  return new Response("OK", { status: 200 });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleGetTodo,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetTodos,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostTodos,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};
Deno.serve(portConfig, handleRequest);