import { db, auth } from "../firebase";
import firebase from "firebase";
export const DataFunctions = {
  logout: function () {
    return auth.signOut();
  },
  // update email address
  updateEailAddress: function (email, uid) {
    db.collection("Users")
      .doc(uid)
      .update({ Email: email })
      .then(() => {
        console.log("email updated successfully");
      });
  },

  createVacancies: function (data) {
    db.collection("Vacancies")
      .add(data)
      .then(() => console.log("sucessfully created"))
      .catch((err) => console.log(err));
  },

  //create doc no id
  CreateDocNoId: function (title, data, dispatch, owner, images, storage) {
    db.collection(title)
      .add({
        Property_Title: data.Property_Title,
        Status: data.Status,
        Owner_id: owner,
        Type: data.Type,
        Price: data.Price,
        Width: data.Width,
        Length: data.Length,
        PriceUnit: data.PriceUnit,
        Physical_Address: data.Physical_Address,
        City: data.City,
        State: data.State,
        Detailed_Information: data.Detailed_Information,
        Building_Age: data.Building_Age,
        date_created: new Date(),
        List_Img_Urls: [],
        approved: false,
        visited: false,
      })
      .then((docRef) => {
        // get doc Id
        var propertyTable = db.collection("List_Properties").doc(docRef.id);
        //upload Images
        // ==============================================================================================================

        // upload Images

        const promises = [];
        images.map((image) => {
          dispatch({ type: "LOADER_TRUE" });
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          promises.push(uploadTask);
          uploadTask.on(
            "state_shanged",
            (snapshot) => {
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              dispatch({
                type: "PROGRESS_BAR",
                payload: percentage,
              });
              console.log(percentage);
            },
            // setProgress(progress)
            (error) => {
              console.log(error);
            },
            async () => {
              await storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  console.log(url);
                  // ========================================================now update urls
                  propertyTable.update({
                    List_Img_Urls: firebase.firestore.FieldValue.arrayUnion({
                      url,
                      id: Math.random(),
                    }),
                  });
                });
            }
          );
          return uploadTask;
        });
        Promise.all(promises).then(() => {
          dispatch({
            type: "PROGRESS_BAR_REMOVE",
            payload: 0,
          });
        });

        // ===========================================////////////////////////////////////////////////////////////////

        // get doc id
      })
      .catch(() => {
        dispatch({ type: "REMOVE_MESSAGE" });
        dispatch({
          type: "ADD_ERROR",
          payload: "Error Submitting Your Document",
        });
      });
  },
};
