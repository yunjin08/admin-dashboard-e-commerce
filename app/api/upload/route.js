import multiparty from "multiparty";

export const POST = async (req, res) => {
  try {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    console.log("length", files.length);
    console.log(fields);
    return new Response("Ok", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
