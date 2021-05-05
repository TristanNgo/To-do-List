function TaskService(){
    this.getListTask =function(){
        return axios({
            url: `https://5f5f9980df620f00163e5f83.mockapi.io/Todo`,
            method: "GET",
        })
    }
    this.addTask = function(task){
        return axios({
            url:`https://5f5f9980df620f00163e5f83.mockapi.io/Todo`,
            method: "POST",
            data: task,
        })
        
    }
    this.deleteTask = function(id){
        return axios({
            url: `https://5f5f9980df620f00163e5f83.mockapi.io/Todo/${id}`,
            method: "DELETE",
        })
    }
    
    this.getlistTaskByID = function(id){
        return axios({
            url: `https://5f5f9980df620f00163e5f83.mockapi.io/Todo/${id}`,
            method: "GET",
        })
    }
    this.updateTask = function(task){
        return axios({
            url: `https://5f5f9980df620f00163e5f83.mockapi.io/Todo/${task.id}`,
            method: "PUT",
            data: task,
        })
    }
}