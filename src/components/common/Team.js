import React, {Component} from 'react';
import TeamMember from './TeamMember';
import img1 from '../assets/img/team/1.jpg';
import img2 from '../assets/img/team/2.jpg';
import img3 from '../assets/img/team/3.jpg';

const members = [
    {name: 'Kay Garland', title: 'Lead Designer', image: img1},
    {name: 'Larry Parker', title: 'Lead Marketer', image: img2},
    {name: 'Diana Petersen', title: 'Lead Developer', image: img3},

];

class Team extends Component{
    render(){
        return(
            <div>
                <section className="page-section bg-light" id="team">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div className="row">
                            {members.map((member, index) => {
                                return <TeamMember {...member} key={index} />
                            })}
                            
                        </div>
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                        </div>
                        
                    </div>
                </section>

                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 my-3">
                                <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/envato.jpg" alt="" /></a>
                            </div>
                            <div className="col-md-3 col-sm-6 my-3">
                                <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/designmodo.jpg" alt="" /></a>
                            </div>
                            <div className="col-md-3 col-sm-6 my-3">
                                <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/themeforest.jpg" alt="" /></a>
                            </div>
                            <div className="col-md-3 col-sm-6 my-3">
                                <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/creative-market.jpg" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Team;