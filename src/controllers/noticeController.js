const {Notice} = require("../db")

module.exports = {
    createNotice: async (data) => {
        const notice = await Notice.create(data)
        return notice
    },
    updateNotice: async (data) => {
        const notice = await Notice.findByPk(data.noticeId)
        if(notice){
            for (const key in data) {
                    notice[key] = data[key];
              }
            await notice.save()
            return notice
        }else return "No encontramos la noticia"
    },
    getNotices: async () => {
        const notices = await Notice.findAll()
        return notices
    },
}