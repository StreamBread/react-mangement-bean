import skillService from '../services/skillService'
import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class SkillStore {

    @observable _skillsList = null
    @observable loading = false

    @computed get skillsList() {
        return this._skillsList ? toJS(this._skillsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getSkills(userId) {
        this.loading = true
        this.service.fetchSkills(userId).then(res => {
            this._skillsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getSkill(skillId, userId) {
        return this.service.fetchSkill(skillId, userId)
    }

    @action addSkill(params, userId) {
        this.loading = true
        this.service.createSkill(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/skills`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateSkill(params, userId) {
        this.loading = true
        this.service.updateSkill(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/skills`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let skillStore = new SkillStore(skillService)

export default skillStore