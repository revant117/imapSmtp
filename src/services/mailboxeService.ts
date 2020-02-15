import mongoose from "mongoose"
import { db } from '../db/connection'
import { to } from '../utils'
import { HTTP_STATUS, ServerError } from '../errors'
import { IMailbox } from '../db/mailboxes'
import { ServiceContext } from '../types/types'

class MailboxService {

    Mailbox: mongoose.Model<IMailbox>

    constructor(model: mongoose.Model<any>) {
        this.Mailbox = model
    }

    systemMailbox: any = [{
        name: "Inbox",
        imapName: "INBOX",
        specialUse: null,
        path: "/", // This means its the root. Its children will have a path Inbox/work
        delimiter: "/"
    },
    {
        name: "Sent Mail",
        imapName: "Sent",
        specialUse: "/Sent",
        path: "/",
        delimiter: "/"
    },
    {
        name: "Trash",
        imapName: "Trash",
        specialUse: '/Trash',
        path: "/",
        delimiter: "/",
        retention: true
    },
    {
        name: "Drafts",
        imapName: "Drafts",
        specialUse: "/Drafts",
        path: "/",
        delimiter: "/"
    },
    {
        name: "Junk Mail",
        imapName: "Junk",
        specialUse: "/Junk",
        path: "/",
        delimiter: "/",
        retention: true
    }]

    defaultTrashRetention: Number = 0 // This can be configured in the future. 0 means infinite retention
    defaultJunkRetention: Number = 0

    async createSystemMailboxes(ctx: ServiceContext, user: mongoose.Types.ObjectId, address: mongoose.Types.ObjectId, options?: Object): Promise<IMailbox[]> {
        let dbCallOptions: mongoose.SaveOptions = {}
        if (ctx.session) {
            dbCallOptions.session = ctx.session
        }

        let docs: any[] = []
        let uidValidity = Math.floor(Date.now() / 1000);

        this.systemMailbox.forEach((mailbox: any) => {

            let retentionTime: Number = 0

            if (mailbox.imapName == "Junk") {
                retentionTime = this.defaultJunkRetention
            } else if (mailbox.imapName == "Trash") {
                retentionTime = this.defaultTrashRetention
            }

            let mailboxDocument: any = {
                user: user,
                address: address,
                name: mailbox.name,
                imapName: mailbox.imapName,
                specialUse: mailbox.specialUse,
                delimiter: mailbox.delimiter,
                retention: mailbox.retention,
                retentionTime: retentionTime,
                uidValidity,
                uidNext: 1,
                modifyIndex: 0,
                subscribed: true,
                metadata: {}
            }

            docs.push(mailboxDocument)
        });

        let err: any
        let result: any

        [err, result] = await to(this.Mailbox.create(docs, dbCallOptions))

        if (err != null) {
            throw new ServerError(HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message, err.name || "")
        }

        return <IMailbox[]>result
    }
}

// export default new MailboxService(db.main.models.Mailbox)
export default MailboxService