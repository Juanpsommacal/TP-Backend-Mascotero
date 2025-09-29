import mongoose from 'mongoose';

const pedidosSchema = new mongoose.Schema({
    pedidoId: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },

    userId: {
        type: String,
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    userPhone:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Ensure a unique index on pedidoId (safety)
pedidosSchema.index({ pedidoId: 1 }, { unique: true });

// Counter schema/model for atomic auto-increment
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // sequence name, e.g., 'pedidoId'
  seq: { type: Number, default: 0 }
}, { collection: 'counters' });

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

// Pre-validate hook to auto-assign incremental pedidoId starting at 1
pedidosSchema.pre('validate', async function(next) {
  try {
    if (this.isNew && (this.pedidoId === undefined || this.pedidoId === null)) {
      const updated = await Counter.findOneAndUpdate(
        { _id: 'pedidoId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      ).lean();
      this.pedidoId = updated.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});


export default mongoose.model("pedidos", pedidosSchema);
