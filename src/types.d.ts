type GitHubRepo = {
    id: string,
    full_name: string,
    html_url: string,
    owner: GitHubUser,
}
type GitHubUser = {
    id: string,
    role_name: string,
    login: string,
    html_url: string,
    avatar_url: string,
}
