

TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

**Process Measures**

During this sprint, the team committed to three stories, all of which were completed by the end of the sprint. The total story points committed amounted to 10, matching the 10 story points completed. In terms of time estimation, the team initially planned for 82 hours to complete these tasks. However, the actual time spent was slightly less, totaling 78 hours and 59 minutes, demonstrating strong time management and efficiency.

The team also follows a formal Definition of Done (DoD), which is documented [here](https://storage.veebor.dev/s/NGiJ689aSEc7ReY) and ensures each completed story meets required standards, including passing unit tests, completed code reviews, code availability on VCS, and end-to-end testing.

**Sum-up**

| Metric           | Planned/Committed | Actual/Completed |
| ---------------- | ----------------- | ---------------- |
| **Stories**      | 3                 | 3                |
| **Story Points** | 10                | 10               |
| **Hours**        | 82 hours          | 78 hours 59 min  |



### Detailed statistics

| Story               | # Tasks | Points | Hours est. | Hours actual |
| ------------------  | ------- | ------ | ---------- | ------------ |
| _#0_                | 13      | -      | 56h 00m    | 26h 17m      |
| OQ-1	Get ticket    | 5       | 3      | 13h 00m    | 23h 57m      |
| OQ-2	Next customer | 3       | 5      | 7h 00m     | 17h 00m      |
| OQ-3	Call customer | 3       | 2      | 6h 00m     | 11h 45m      |

In terms of task estimates, the team planned for an average of 2.81 hours per task, with an observed standard deviation of 1.03 hours, while the actual time spent averaged at 4.10 hours per task, with a standard deviation of 1.56 hours. This variance reflects some unpredictability in task completion times across stories.

When comparing total estimated versus actual hours, the team demonstrated accuracy, with actual time being only 3.68% lower than estimated, indicating a strong alignment overall. However, looking at each task individually, the absolute relative estimation error was about 94%, meaning that, on average, actual time per task differed from estimates by 94%, reflecting areas for refinement in task-specific time prediction.

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

Here’s a table to summarize the **Detailed Statistics**:

| Metric                               | Estimated              | Actual               |
|--------------------------------------|------------------------|----------------------|
| **Hours per Task**                   | 2.81 hours (avg)      | 4.10 hours (avg)     |
| **Standard Deviation per Task**      | 1.03 hours            | 1.56 hours           |
| **Total Estimation Error Ratio**     | \-                    | -3.68%               |
| **Absolute Relative Task Estimation Error** | \-           | 94%                  |

This table highlights the key data for average hours, variance in estimates, and overall estimation accuracy across tasks.
## QUALITY MEASURES 

1. **Unit Testing**:
   - Total estimated hours: 11 h
   - Total actual hours: 8h 

2. **E2E Testing**:
   - Total estimated hours: 11h
   - Total actual hours: 15h 

3. **Code Review**:
   - Total estimated hours: 3h
   - Total actual hours: 5h


## ASSESSMENT

- What caused your errors in estimation (if any)?
  * in some cases, it would better to speak more about several fundemental tasks to prevent doing simaltenous and same tasks by two persons.
  * Generally we need to spend more time to have meetings to be matched and have a same sight for doing a task. 
  * We did not make a UI mockup leading to unnecessary and inconsistent work.

- What lessons did you learn (both positive and negative) in this sprint?
  Positive: 
    * We learnt that all the team members act as a professional team members and we feel a high level of cooperation in the team, without judging and we can feel that everyone like to help the others. It's really worthy. 
    * The most feature that we felt inside the group was that most of the team members are skilled in managing and it helps the team to go forward better than a situation in which everyone is waiting for the others. 
    * Experinces of team members technically helped to form and do tasks better. 
    * Being familiar with soft skills, helped to be matched rapidly.

  Negative:
    * The lack of speaking for knowing the exact processes. Something was not clear during the sprint. 
    * It would be better if we defined several rules at first and then to start the tasks. For example if we defined to check the tasks until the end of unit tests and resolving any kinds of errors before pushing a branch on the github, it could prevent time consuming and speed up the works.
    * The description for tasks was not enough, this problem beside the lack of speech at the beginning of the sprint make a kind of isolation feeling for team members about the amount of being involved the project. 


- Which improvement goals set in the previous retrospective were you able to achieve? 

- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  > Propose one or two
    Better coordinate git workflow

- One thing you are proud of as a Team!!
  * Being focused and great cooperation between team members.

