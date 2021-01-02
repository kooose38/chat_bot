import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

export const addResponse = functions.region("asia-northeast2").https.onRequest(async (req: any, res: any) => {
   if (req.method !== "POST") {
      res.status(405).json([{ statusCode: 405, error: "Invalid Request" }]);
   } else {

      try {
         const dataset = req.body;  //オブジェクト
         for (const key of Object.keys(dataset)) {
            const data = dataset[key];

            await db.collection("questions").doc(key).set(data)
         }
         res.status(200).json([{ statusCode: 200, message: "successfully" }]);
      } catch (e) {
         res.status(500).json([{ statusCode: 500, error: "fail ..." }])
      }

   }
});
