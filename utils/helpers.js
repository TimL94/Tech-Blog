
// formats the date into a more legible format
module.exports = {
    format_date: (timestamp) => {
        return `${new Date(timestamp).getMonth() + 1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear()}`
    }
}