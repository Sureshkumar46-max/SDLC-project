package com.sdlc.backend.service;

import com.sdlc.backend.dto.CreateOrganizationRequest;
import com.sdlc.backend.dto.CreateTeamRequest;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.repository.OrganizationRepository;
import com.sdlc.backend.repository.TeamRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrgTeamService {

    private final OrganizationRepository orgRepo;
    private final TeamRepository teamRepo;

    public OrgTeamService(OrganizationRepository orgRepo, TeamRepository teamRepo) {
        this.orgRepo = orgRepo;
        this.teamRepo = teamRepo;
    }

    public Organization createOrganization(CreateOrganizationRequest req, Long creatorUserId) {
        Organization org = new Organization();
        org.setName(req.getName());
        org.setCreatedBy(creatorUserId);
        return orgRepo.save(org);
    }

    public Team createTeam(Long orgId, CreateTeamRequest req) {
        Organization org = orgRepo.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        Team team = new Team();
        team.setName(req.getName());
        team.setOrganization(org);
        return teamRepo.save(team);
    }

    public List<Team> getTeamsForOrg(Long orgId) {
        return teamRepo.findByOrganizationId(orgId);
    }
}