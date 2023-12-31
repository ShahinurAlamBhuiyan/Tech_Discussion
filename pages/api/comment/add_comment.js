import connect from "../../../database/connect";
import Comments from "../../../models/comments";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connect.connect();
    const newComment = new Comments(req.body);
    await newComment.save();
    const comments = await Comments.find();
    console.log(comments);
    if (comments) {
      res.status(200).json({message: "Comment added successfully"});
    } else {
      res.status(409).json({ message: "Something went wrong"});
    }
  }
}
