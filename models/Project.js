import { Schema, model, models } from "mongoose";

const DomainSchema = new Schema(
  {
    name: { type: String, required: true},
    data: { type: String, required: true},
    active: { type: Boolean, required: true },
    default: { type: Boolean, required: true },
    certificate: {
      name: { type: String, required: false }, // these are required, just not populated immediately
      type: { type: String, required: false },
      value: { type: String, required: false },
      status: { type: String, required: true },
      arn: { type: String, required: true },
    },
  },
  { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
  );

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    picture: { type: String, required: false },

    // s3 info
    bucket_name: { type: String, required: true },
    bucket_url: { type: String, required: false },

    // cloudfront info
    cloudfront_location: { type: String, required: false },
    cloudfront_id: { type: String, required: false },
    cloudfront_arn: { type: String, required: false },
    cloudfront_domain_name: { type: String, required: false },

    // ETag: { type: String, required: false },
    api_key: { type: String, required: true },
    domains: { type: [DomainSchema], required: false, default: [] },
  },
  { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }
);

export default models.Project || model("Project", ProjectSchema);
