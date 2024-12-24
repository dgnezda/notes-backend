export enum PermissionsEnum {
  NONE = 0,

  /*
   * NOTE_VIEW - user can view notes
   */
  NOTE_VIEW = 1 << 0,

  /*
   * NOTE_EDIT - user can create & update notes (but not delete)
   */
  NOTE_EDIT = 1 << 1,

  /*
   * NOTE_DELETE - user can delete notes
   * (restricted to admin in your scenario)
   */
  NOTE_DELETE = 1 << 2,

  /*
   * FOLDER_MANAGE - user can create, rename, delete folders
   * (restricted to admin in your scenario)
   */
  FOLDER_MANAGE = 1 << 3,

  /*
   * GROUP_MANAGE - user can invite/remove users,
   * promote/demote others to admin
   */
  GROUP_MANAGE = 1 << 4,
}

// NONE                        = 0,
// ALL                         = 1 << 0,

// DISCLAIMER_ACCESS           = 1 << 1,
// VIEW_DOCUMENTS              = 1 << 2,
// VIEW_PERMISSIONS            = 1 << 3,
// VIEW_REPORTS                = 1 << 4,
// VIEW_USERS                  = 1 << 5,

// NEWFILES_VIEW               = 1 << 6,
// FAVORITE_VIEW               = 1 << 7,
// TRASH_VIEW                  = 1 << 8,
// QUEUE_VIEW                  = 1 << 9,
// TASK_VIEW                   = 1 << 10,

// PROJECT_SEND_EMAIL          = 1 << 11,
// PROJECT_FOLDER_ADD          = 1 << 12,
// PROJECT_FILEROOM_ADD        = 1 << 13,
// PROJECT_FILEROOM_ACTIVATE   = 1 << 14,
// PROJECT_FILEROOM_DEACTIVATE = 1 << 15,

// PROJECT_USER_INVITE         = 1 << 16,
// PROJECT_USER_DEACTIVATE     = 1 << 17,
// PROJECT_USER_ACTIVATE       = 1 << 18,
// PROJECT_USER_CAG_CHANGE     = 1 << 19,
// PROJECT_USER_FAG_CHANGE     = 1 << 20,

// TEAM_QA_QUESTION            = 1 << 21,
// TEAM_QA_ANSWER              = 1 << 22,
// TEAM_QA_ANSWER_VIEW         = 1 << 23,
// TEAM_QA_APPROVER            = 1 << 24,

// CONTENT_UPLOAD              = 1 << 25,
// CONTENT_PERMISSIONS         = 1 << 26,
// CONTENT_RENAME              = 1 << 27,
// CONTENT_DELETE              = 1 << 28,
// CONTENT_MOVE                = 1 << 28,
// CONTENT_COPY                = 1 << 30,
// CONTENT_REPLACE             = 1 << 31,
// CONTENT_SEARCH              = 1 << 32,
// CONTENT_DOWNLOAD            = 1 << 33,
// CONTENT_UPDATE              = 1 << 34,
// CONTENT_DOWNLOAD_BULK       = 1 << 35,
// CONTENT_PERMANENT_DELETE    = 1 << 36,
