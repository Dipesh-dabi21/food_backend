import { Server } from "socket.io";
let io;
export function attachSocketServer(server) {
  const origins = (
    process.env.CLIENT_ORIGINS || "http://localhost:5173,http://localhost:5174"
  )
    .split(",")
    .map((s) => s.trim());
  io = new Server(server, {
    cors: { origin: origins, methods: ["GET", "POST"] },
  });
  io.on("connection", (socket) => {
    socket.on("order:subscribe", (id) => {
      if (typeof id === "string" && id.length < 100) socket.join(`order:${id}`);
    });
  });
  return io;
}
export function emitOrderUpdated(order) {
  if (io) {
    const data = {
      _id: order._id,
      status: order.status,
      statusHistory: order.statusHistory,
      updatedAt: order.updatedAt,
    };
    io.to(`order:${order._id}`).emit("order:updated", data);
    io.emit("admin:order-updated", data);
  }
}
