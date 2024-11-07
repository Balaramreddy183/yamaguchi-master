export const AppConfig = {

//admin endpoints
//login
login: 'Admin/login',

//logout
logout: 'Admin/Logout',

//isLoggedIn
isLoggedIn: 'Admin/IsLoggedIn',




    // gallery endpoints
    createGalleryImages: 'Gallery/CreateGalleryImage', 
    getGalleryImages: 'Gallery/getAllGalleryImages',
    updateGalleryImage: 'Gallery/UpdateGalleryImage',
    deleteGalleryImage: 'Gallery/DeleteGalleryImage',

    // trainer endpoints
    getAllTrainerDetails: 'TrainerDetails/GetAllTrainerDetails',
    createTrainerDetails: 'TrainerDetails/CreateTrainerDetails',
    updateTrainerDetails: 'TrainerDetails/UpdateTrainerDetails',
    deleteTrainerDetails: 'TrainerDetails/DeleteTrainerDetails',

    // total visits endpoints
    getTotalVisits: 'TotalVisits/GetTotalVisits',
    createTotalVisits: 'TotalVisits/UpdateTotalVisits', 

    // mail endpoints
    sendMail: 'Mail/SendMail',
    getEmails: 'Mail/GetEmails'
}