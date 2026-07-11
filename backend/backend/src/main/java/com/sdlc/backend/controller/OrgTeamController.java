package com.sdlc.backend.controller;

import com.sdlc.backend.dto.CreateOrganizationRequest;
import com.sdlc.backend.dto.CreateTeamRequest;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.service.OrgTeamService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orgs")
public class OrgTeamController {

    private final OrgTeamService orgTeamService;

    public OrgTeamController(OrgTeamService orgTeamService) {
        this.orgTeamService = orgTeamService;
    }

    @PostMapping
    public Organization createOrg(@RequestBody CreateOrganizationRequest req) {
        Long dummyUserId = 1L;   // temporary — JWT integration pannumbodhu maathuvom
        return orgTeamService.createOrganization(req, dummyUserId);
    }

    @PostMapping("/{orgId}/teams")
    public Team createTeam(@PathVariable Long orgId, @RequestBody CreateTeamRequest req) {
        return orgTeamService.createTeam(orgId, req);
    }

    @GetMapping("/{orgId}/teams")
    public List<Team> getTeams(@PathVariable Long orgId) {
        return orgTeamService.getTeamsForOrg(orgId);
    }
}