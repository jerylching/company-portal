# Backend API Repository Guidelines

## Repository Cloning

Clone this repository to your machine by executing the command below:

```bash
git clone [https-link]
```

Where the `[https-link]` is the copied link in the Clone button.

## Branch Creation

To ensure that you are in the `main` branch before creating a new project branch, execute `git branch --show-current` in your terminal.

If the output is not the `main` branch, execute `git checkout main` to go to the main branch.

Once in the main branch, execute the following commands below:

```bash
git branch p4-backend-api
git checkout p4-backend-api
```

Where `p4-backend-api` is the name of the project as specified in Moodle.

Once it is done, you can now work on your project.

## Code Migration

For this project, you do not need to put the files and folders inside the `p4-backend-api` folder. Simply copy the files and folders from your Express.js API project folder to this repository folder and commit the changes to the branch.

## Submissions

After working on your project, you will need to do two things:

### Merge Request

After committing all the changes in your project branch, execute `git push origin p4-backend-api`.

Then, Go to your GitLab account and create the merge request as instructed. 

(Important) Make sure that the merge request title is the same as the name of your project branch.

### Moodle Submission

After successfully creating the merge request, ensure that the link to the overview page of the merge request is submitted to Moodle. 

By submitting it to Moodle, you are indicating that you are done with your work and it is ready for the reviewer to assess your work and provide feedback.
