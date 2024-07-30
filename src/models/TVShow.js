import mongoose from 'mongoose';

const castProps = {
    id: Number,
    name: String,
    birthday: {
        type: Date,
        get: function (v) {
            return v ? new Date(v).toISOString().split('T')[0] : null;
        }
    },
}

const castSchema = new mongoose.Schema(castProps, { _id: false });

const props = {
    id: Number,
    name: String,
    cast: [castSchema]
}

const schemaOptions = {
    timestamps: true,
    methods: {

    },
    // virtuals,
    toJSON: { getters: true, virtuals: true, minimize: false, versionKey: false }
};

const tvShowSchema = new mongoose.Schema(props, schemaOptions);

tvShowSchema.index({ tvMazeId: 1 });

const TVShow = new mongoose.model('TVShows', tvShowSchema);

export { TVShow }