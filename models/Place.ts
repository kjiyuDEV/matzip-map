import mongoose from 'mongoose';

export interface Places extends mongoose.Document {
    name: string;
    category: string;
    writer: string;
    comment: string;
    address: string;
    x: number;
    y: number;
}

const PlacesSchema = new mongoose.Schema<Places>({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
        maxLength: 60,
    },
    comment: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
});

export default mongoose.models.Places ||
    mongoose.model<Places>('Places', PlacesSchema);
