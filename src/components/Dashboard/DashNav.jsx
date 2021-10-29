import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/DashNav.css'

const DashNav = () => {
    return (
        <div className="dash-nav">
            <Link className="dashboard-btn" name='settings' to="/dashboard/settings">
                Settings
            </Link>
            <Link className="dashboard-btn" name='timeline' to="/dashboard/timeline">
                    Time Line
            </Link>
            <Link className="dashboard-btn" name='memories' to="/dashboard/memories">
                    Memories
            </Link>
            <Link className="dashboard-btn" name='bucketlist' to="/dashboard/bucketlist">
                    Bucket List
            </Link>
        </div>
    );
};

export default DashNav;