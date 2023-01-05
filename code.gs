function autoFillIPSTemplateGoogleDoc(e) {
  // 
  let investorName = e.values[1];
  let timeStamp = e.values[0];
  let emailID = e.values[26]

  // Converting Array to string
  const goals = e.values[3].toString();

  // Creating Goal Variables
  let goal1 = ""
  let goal2 = ""
  let goal3 = ""

  //Create Array and storing it to variables
  goalsArr = goals.split(',')
  if (goalsArr.length >= 1)
    goal1 = goalsArr[0]
  if (goalsArr.length >= 2)
    goal2 = goalsArr[1]
  if (goalsArr.length >= 3)
    goal3 = goalsArr[2]





  const file = DriveApp.getFileById(templateID);

  var folder = DriveApp.getFolderById(folderID)

  var copy = file.makeCopy(investorName + ' Investment Policy', folder);

  var doc = DocumentApp.openById(copy.getId());

  var body = doc.getBody();



  body.replaceText('%InvestorName%', investorName);
  body.replaceText('%Date%', timeStamp);

  body.replaceText('%Goal1%', goal1.trim())
  body.replaceText('%Goal2%', goal2.trim())
  body.replaceText('%Goal3%', goal3.trim())


  doc.saveAndClose();

  var attach = DriveApp.getFileById(copy.getId());
  var pdfattach = attach.getAs(MimeType.PDF);
  MailApp.sendEmail(emailID, subject, emailBody, { attachments: [pdfattach] });
}
