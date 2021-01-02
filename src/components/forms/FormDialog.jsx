import React, { useCallback, useState } from 'react'
import Textinput from "./Textinput";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = ({ open, setOpen }) => {
   const [name, setName] = useState(""),
      [email, setEmail] = useState(""),
      [description, setDescription] = useState("");

   const inputName = useCallback((e) => {
      setName(e.target.value);
   }, [setName]);
   const inputEmail = useCallback((e) => {
      setEmail(e.target.value);
   }, [setEmail]);
   const inputDescription = useCallback((e) => {
      setDescription(e.target.value);
   }, [setDescription]);

   const handleClose = () => {
      setOpen(false);
   };
   //address test 
   const validateEmailFormat = (email) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return regex.test(email) //true || false 
   };

   const submitForm = async (name, email, description) => {
      if (name === "" || email === "" || description === "") {
         alert("入力してください。")
         return;
      }
      const confirmedEmail = validateEmailFormat(email);
      if (!confirmedEmail) {
         alert("メールアドレスの形式が異なります");
         return;
      }

      const payload = {
         text: `お問い合わせがありました。\n` +
            `お名前` + name + `\n` +
            `Email` + email + `\n` +
            `内容\n` + description
      }
      await fetch(`https://hooks.slack.com/services/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`, {
         method: "POST",
         body: JSON.stringify(payload)
      }).then(() => {
         alert("送信できました。");
         handleClose();
         setName("")
         setEmail("")
         setDescription("")
      }).catch(() => {
         alert("通信環境をご確認の上、再度お試しください。");
      })
   };

   return (
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
         <DialogContent>
            <Textinput
               fullWidth={true} mulitiline={false} rows={1} label={"お名前"}
               value={name} type={"text"} onChange={inputName}
            />
            <Textinput
               fullWidth={true} mulitiline={false} rows={1} label={"メールアドレス"}
               value={email} type={"email"} onChange={inputEmail}
            />
            <Textinput
               fullWidth={true} mulitiline={true} rows={5} label={"お問い合わせ内容"}
               value={description} type={"text"} onChange={inputDescription}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="primary">
               キャンセル
        </Button>
            <Button onClick={() => submitForm(name, email, description)} color="primary" autoFocus>
               送信する
        </Button>
         </DialogActions>
      </Dialog >
   )
};

export default FormDialog;