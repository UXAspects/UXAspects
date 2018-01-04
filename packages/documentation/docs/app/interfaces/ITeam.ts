export interface ITeam {
    team: [{
        name: string;
        email: string;
        avatar: string;
        social: [
        {
            icon: string;
            url: string;
        }]
    }];
}