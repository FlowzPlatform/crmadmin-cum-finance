curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
-X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
     "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:obdev/crmadmin_frontend_flowz:demo","kind": "container","labels":{"io.rancher.container.pull_image": "always","io.rancher.scheduler.affinity:host_label": "machine=crm-front","io.rancher.scheduler.affinity:container_label_soft_ne": "io.rancher.stack_service.name=front-flowz/crmadmin-frontend-flowz"
},"ports": ["443:443/tcp","80:80/tcp"],"version": "0","healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 80,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"requestLine": "GET \"http://localhost\" \"HTTP/1.0\"","responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
'http://rancher.flowz.com:8080/v2-beta/projects/1a29/services/1s508?action=upgrade'